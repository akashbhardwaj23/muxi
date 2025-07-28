import { Router, type Request, type Response } from "express";
import { SignInInputs, SignUpInputs } from "../zod";
import { prisma } from "../db/db";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { AuthMiddleWare } from "../middleware/auth";
import { getAllImages } from "../lib/utils";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  const success = SignInInputs.safeParse(req.body);

  if (!success.success) {
    console.log("signin inputs ", req.body)
    res.status(403).json({
      message: "Inputs are Incorrect",
    });
    return;
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: success.data!.email,
      },
    });

    if (!user) {
      res.status(403).json({
        message: "User is Not Present",
      });
      return;
    }

    const correctPassword = await bcryptjs.compare(
      success.data.password,
      user.passsword
    );

    if (!correctPassword) {
      res.status(403).json({
        message: "Password is Incorrect",
      });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);

    res.json({
      userId: user.id,
      token,
    });
  } catch (error) {
    console.log("prisma error ", error);
    res.status(403).json({
      message: "Email Already Present",
    });
  }
});

router.post("/register", async (req: Request, res: Response) => {
  const body = req.body;

  const success = SignUpInputs.safeParse(body);

  if (!success.success) {
    console.log("signup inputs ", req.body)
    res.status(403).json({
      message: "Inputs are not correct",
    });
    return;
  }

  const hashedPassword = await bcryptjs.hash(success.data.password, 8);

  try {
    console.log("here")
    const user = await prisma.user.create({
      data: {
        email: success.data.email,
        name: success.data.name,
        passsword: hashedPassword,
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);

    res.json({
      userId: user.id,
      token,
    });
  } catch (error) {
    console.log("prisma error ", error);
    res.status(403).json({
      message: "User Already Present",
    });
  }
});

router.get("/user/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      res.status(404).json({
        message: "No User Found",
      });
      return;
    }

    res.json({
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: "Error While Getting User",
    });
  }
});

router.post(
  "/createRoom",
  AuthMiddleWare,
  async (req: Request, res: Response) => {
    const { name, description, songId } = req.body;
    const userId = req.userId;

    console.log("here");

    try {
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (!user) {
        res.status(404).json({
          message: "User Not Found",
        });
        return;
      }
      const song = await prisma.songs.findFirst({
        where: {
          id: songId,
        },
      });

      if (!song) {
        res.status(404).json({
          message: "Song Not Found",
        });
        return;
      }

      const room = await prisma.rooms.create({
        data: {
          name,
          description,
          songId: songId,
          owner : user.id
        },
      });

      res.json({
        roomId: room.id,
      });

    } catch (error) {
      console.log("error is ", error);
      res.status(401).json({
        message: "Error While Creating Room",
      });
    }
  }
);

let TOTAL_REQUEST_SONGS = 0

router.get("/songs", AuthMiddleWare, async (req: Request, res: Response) => {
  const songs = await prisma.songs.findMany();

  //   console.log("songs are ", songs);

  TOTAL_REQUEST_SONGS++;


  console.log("Total song request ",TOTAL_REQUEST_SONGS)
  res.json({
    songs,
  });
});

router.post(
  "/addSong",
  AuthMiddleWare,
  async (req: Request, res: Response) => { }
);

router.get("/rooms", async (req: Request, res: Response) => {
  const rooms = await prisma.rooms.findMany({});

  res.json({
    rooms: rooms,
  });
});

// router.get("/rooms/:roomId", async (req: Request, res: Response) => {
//   const { roomId } = req.params;
//   const room = await prisma.rooms.findUnique({
//     where: {
//       id: roomId
//     }
//   })

//   res.json({
//     room: room
//   })
// })

router.get("/songs/:songId", async (req: Request, res: Response) => {
  const { songId } = req.params;
  console.log("song id is ", songId)
  try {
    const song = await prisma.songs.findUnique({
      where: {
        id: songId,
      },
    });

    if (!song) {
      res.status(404).json({
        message: "No Song Found",
      });
      return;
    }

    res.json({
      song,
    });
  } catch (error) {
    res.status(403).json({
      message: "Error While Getting Songs",
    });
  }
});

let TOTAL_REQUEST_IMAGE = 0;

router.get("/images", async (req, res) => {
  const imageResource = await getAllImages();
  const allImages = imageResource.resources;
  // console.log("all images ", allImages)

  TOTAL_REQUEST_IMAGE++;



  console.log("Total Image Request ", TOTAL_REQUEST_IMAGE)
  res.json({
    images : allImages
  })
})

router.get(
  "/rooms/:roomId",
  AuthMiddleWare,
  async (req: Request, res: Response) => {
    const { roomId } = req.params;
    const userId = req.userId;

    try {
      const room = await prisma.rooms.findFirst({
        where: {
          id: roomId,
        },
        include: {
          song: true,
          users: true,
        },
      });

      // console.log(room);

      console.log("user is ", userId)
      if (!room) {
        res.status(404).json({
          message: "No Song Found",
        });
        return;
      }

      const existingUserInRoom = room?.users.find(
        (myUser) => myUser.id === userId
      );

      if (!existingUserInRoom) {
        const user = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            room: {
              connect: {
                id: room.id,
              },
            },
          },
        });
      }

      res.json({
        room,
      });
    } catch (error) {
      console.log("error is ", error)
      res.status(403).json({
        message: "Error User Already Present",
      });
    }
  }
);

export default router;

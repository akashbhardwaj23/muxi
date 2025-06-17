// "use client"
// import { redirect } from "next/navigation"
// import { useEffect, useState } from "react"

// export function AuthProvider({
//     children
// } : {
//     children : React.ReactNode
// }){

//     const [authenticated, setAuthenticated] = useState(false)
//     const [hasAuthenticated, setHasAuthenticated] = useState(false)

//     useEffect(() => { 
//     if(window !== undefined){
//         const token = localStorage.getItem("token")
//         const userId = localStorage.getItem("userId")

//         if(token && userId){
//             setAuthenticated(true)
//         }
//     }
//     setHasAuthenticated(true)
//     }, [])

//     if(hasAuthenticated && !authenticated){
//         redirect("/signin")    }

//     return (
//         <>
//         {children}
//         </>
//     )
// }
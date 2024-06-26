import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from '../styles/home.module.css'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';



const index = () => {

  const [details, setDetails] = useState()

  const socket = new WebSocket("ws://localhost:5000")

  useEffect(()=>{
    console.log("Connecting to Back-End...")
    socket.addEventListener("open", (event)=>{
      console.log("Connected to Back-End")
    })

    socket.addEventListener("message", (event)=>{
      console.log("Successfully Replicated Master Trade")
      console.log("Displaying Trade Details: ", JSON.parse(event?.data))
      setDetails(JSON.parse(event?.data))
    })

    socket.addEventListener("close", (event)=>{
      console.log("WebSocket disconnected")
    })

    return () =>{
      socket.close()
    }
  }, [])

  const pingLambda = () =>{
    if(details?.id){
      return
    }
    console.log('Pinging Lambda Function...')
    socket.send('ping')
  }


  const elementRefs = useRef([])

  const assignRef = useCallback((el) =>{
    if(el && !elementRefs.current.includes(el)){
      elementRefs.current.push(el)
    }
  }, [elementRefs])


  useGSAP(()=>{
    let elements = gsap.utils.toArray(elementRefs.current)

    elements.forEach((el) =>{
      gsap.from(el, {
        opacity: 0,
        duration: 1,
        delay: .5,
        // ease: "bounce.out",
      })
    })
  })


  return (
    <div className={`${styles.container} w-full h-screen p-24 flex flex-row justify-between items-end bg-gray-700`}>
      <div className={`${styles.box} w-1/2 h-full px-5 flex flex-col justify-center items-start border bg-gray-600`} ref={assignRef}>
        <h3 className={`${styles.title} pb-2 mb-14 border-b border-white text-3xl font-semibold text-white`}>Trade Details</h3>
        <div className={`${styles.detailBox} flex flex-col`}>
          <h6 className={`${styles.info} ext-xl text-white mb-3`}>id: <span className={styles.span}>{details?.id}</span> </h6>
          <h6 className={`${styles.info} ext-xl text-white mb-3`}>symbol: <span className={styles.span}>{details?.symbol}</span> </h6>
          <h6 className={`${styles.info} ext-xl text-white mb-3`}>operation: <span className={styles.span}>{details?.operation}</span> </h6>
          <h6 className={`${styles.info} ext-xl text-white mb-3`}>volume: <span className={styles.span}>{details?.volume}</span> </h6>
          <h6 className={`${styles.info} ext-xl text-white mb-3`}>takeprofit: <span className={styles.span}>{details?.takeprofit}</span> </h6>
          <h6 className={`${styles.info} ext-xl text-white mb-3`}>comment: <span className={styles.span}>{details?.comment}</span> </h6>
        </div>
      </div>
      <button ref={assignRef} onClick={pingLambda} className={`${styles.button} px-20 py-2.5 flex justify-center items-center border rounded-lg bg-white text-xl font-semibold text-gray-700`}>
        Trade <i className={`bi bi-arrow-right ${styles.arrow}`}></i>
      </button>
    </div>
  )
}

export default index
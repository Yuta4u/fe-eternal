import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setSaldo } from "../redux/counterSlice"

const Titit = () => {
  const saldo = useSelector((state) => state.api.saldo)

  const dispatch = useDispatch()

  async function getProfile() {
    try {
      const { data } = await axios.get("http://localhost:4321/users")
      dispatch(setSaldo(data[0].saldo))
    } catch (error) {
      console.error(error)
    }
  }

  console.log(saldo)
  useEffect(() => {
    getProfile()
  }, [])

  return <div>{saldo}</div>
}

export default Titit

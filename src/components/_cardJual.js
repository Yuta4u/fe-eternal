import { Box, useDisclosure } from "@chakra-ui/react"
import "../assets/css/jual.css"

import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios"

import PostForm from "./assets/postForm"
import CardJual from "./assets/cardJual"

const Jual = () => {
  const [datas, setDatas] = useState([])
  const product = useSelector((state) => state.api.product)

  async function getJual() {
    try {
      const { data } = await axios.get("http://localhost:4321/jual")
      setDatas(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getJual()
  }, [product])

  return (
    <>
      <PostForm /> {/* ========== POST FORM JUAL ========== */}
      <Box className="jual-div">
        {datas.map((e, key) => (
          <CardJual props={e} key={key} />
        ))}
      </Box>
    </>
  )
}

export default Jual

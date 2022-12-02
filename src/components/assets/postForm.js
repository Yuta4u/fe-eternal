// STYLING
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  Input,
  Textarea,
} from "@chakra-ui/react"
import { Report, Loading } from "notiflix"
// OTHER
import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { setProduct } from "../../redux/counterSlice"

// EXECUTION
const PostForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()

  // VARIABLE POST =====
  const nm_toko = useSelector((state) => state.api.profile.nama)
  const [nm_tanaman, setTanaman] = useState("")
  const [deskripsi, setDeskripsi] = useState("")
  const [quantity, setQuantity] = useState("")
  const [harga, setHarga] = useState("")

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  // API
  async function postJual() {
    if (!nm_toko || !nm_tanaman || !deskripsi || !quantity || !harga) {
      invalidInput()
    } else {
      const response = await axios.post("http://localhost:4321/jual", {
        nm_toko,
        nm_tanaman,
        deskripsi,
        quantity,
        harga,
      })
      dispatch(
        setProduct({ nm_toko, nm_tanaman, deskripsi, quantity, harga })
      ).catch((err) => {
        console.error(err)
      })
      if (response) {
        console.log(response)
      }
    }
  }

  // FUNCTION
  function invalidInput() {
    return setTimeout(
      () =>
        Report.failure(
          `GAGAL`,
          `Inputan tidak valid(tidak boleh ada yang kosong!) `,
          "OKAY",
          Loading.remove(),
          {
            failure: {
              backOverlayColor: "rgba(0,0,0,0.5)",
            },
          }
        ),
      300
    )
  }

  function postSuccess() {
    return setTimeout(
      () =>
        Report.success(`BERHASIL`, `berhasil posting tanaman:)`, "OK", "", {
          success: {
            backOverlayColor: "rgba(0,0,0,0.5)",
          },
        }),
      300
    )
  }
  return (
    <>
      <Button
        h="30px"
        onClick={onOpen}
        className="btnopen"
        bgColor="gray.800"
        color="#F7FAFC"
        fontSize="2vh"
        mt="-10px"
        borderRadius="none"
      >
        Jual Product
      </Button>
      <Modal
        closeOnOverlayClick={false}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent backgroundColor="facebook.50">
          <ModalHeader>Post Jual</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                ref={initialRef}
                placeholder="nama tanaman..."
                onChange={(e) => setTanaman(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <Textarea
                placeholder="deskripsi..."
                onChange={(e) => setDeskripsi(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <Input
                placeholder="quantity..."
                onChange={(e) => setQuantity(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <Input
                placeholder="harga jual/pcs"
                onChange={(e) => setHarga(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          {/* =============== BUTTON NAV =============== */}
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => (postJual(), postSuccess(), onClose())}
            >
              Post
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default PostForm

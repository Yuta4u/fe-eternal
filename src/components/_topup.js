import {
  Text,
  Box,
  Button,
  Grid,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react"
import React, { useState, useEffect } from "react"

// STYLING
import { Report, Loading } from "notiflix"
import { useDisclosure } from "@chakra-ui/react"
import { useSelector, useDispatch } from "react-redux"
import "../assets/css/topup.css"
import axios from "axios"

// REDUX
import { setSaldo } from "../redux/counterSlice"

const Topup = () => {
  // VARIABLE
  const data = useSelector((state) => state.api.profile) // REDUX VARIABLE GLOBAL
  const [value, setValue] = React.useState("")
  const [csaldo, setCsaldo] = React.useState("")

  //
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  // NOMINAL TOPUP
  const nominal = [
    5000, 10000, 15000, 20000, 25000, 50000, 75000, 100000, 125000, 150000,
    200000, 250000, 500000, 1000000,
  ]

  const topup = async () => {
    const response = await axios
      .put(`http://localhost:4321/users/${data.id}`, {
        saldo: value + csaldo,
      })
      .catch((err) => {
        console.log(err)
      })

    if (response) {
      console.log("yey")
    }
  }

  useEffect(() => {
    topup()
  }, [])

  const convertRupiah = (num) => {
    return num
      .toString()
      .split("")
      .reverse()
      .join("")
      .match(/\d{1,3}/g)
      .join(".")
      .split("")
      .reverse()
      .join("")
  } // ========== CONVERT RUPIAH ==========

  function invalidValue() {
    return setTimeout(
      () =>
        Report.failure(
          `GAGAL`,
          `Silahkan pilih saldo terlebih `,
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
  } // ========== INVALID VALUE ==========

  function topupSuccess() {
    return setTimeout(
      () =>
        Report.success(
          `BERHASIL`,
          `terima kasih, topup anda telah berhasil yey!`,
          "OK",
          "",
          {
            success: {
              backOverlayColor: "rgba(0,0,0,0.5)",
            },
          }
        ),
      300
    )
  }

  // EXECUTE TOPUP
  return (
    <Box className="topup-div">
      <Text mb="8px" fontWeight="700" color="whiteAlpha.500">
        Topup: {value ? convertRupiah(value) : value}
      </Text>

      <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={6}>
        {nominal.map((e, i) => (
          <Button
            key={i}
            value={e}
            className="btn"
            onClick={(e) => setValue(Number(e.target.value))}
          >
            {convertRupiah(e)}
          </Button>
        ))}

        {/* BUTTON MAKE SURE TOPUP */}
        <Button
          className="topup"
          bgColor="gray.800"
          color="#F7FAFC"
          w="50%"
          onClick={() =>
            value ? (onOpen(), setCsaldo(data.saldo)) : invalidValue()
          }
        >
          Top up
        </Button>
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          {/* OVERLAY MAKESURE TOPUP */}
          <AlertDialogOverlay />
          <AlertDialogContent bgColor="gray.800" color="#F7FAFC">
            <AlertDialogHeader>Top up?</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              {`Jumlah uang yang anda akan top up kan adalah ${
                value ? convertRupiah(value) : value
              },-`}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} color="gray.800">
                No
              </Button>
              <Button
                colorScheme="red"
                ml={3}
                onClick={() => (
                  topup(),
                  onClose(),
                  dispatch(setSaldo(value + csaldo)),
                  setValue(""),
                  topupSuccess()
                )}
              >
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Grid>
    </Box>
  )
}

export default Topup

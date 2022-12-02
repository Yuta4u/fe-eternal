import "../assets/css/profile.css"
import {
  Image,
  Center,
  Box,
  Icon,
  Button,
  Collapse,
  useDisclosure,
  Avatar,
  Text,
  Divider,
} from "@chakra-ui/react"
import {
  ExternalLinkIcon,
  ChatIcon,
  StarIcon,
  EditIcon,
  CheckIcon,
} from "@chakra-ui/icons"
import { useEffect, useMemo, useState } from "react"
import { Loading } from "notiflix/build/notiflix-loading-aio" // LOADING
import { Report } from "notiflix/build/notiflix-report-aio" // REPORT

// ASSETS
import ProfileImg from "../assets/img/john.jpg"

// COMPONENT
import _content_riwayatBeli from "./_cardRiwayatBeli"
import _content_wishlist from "./_wishlist"
import Jual from "./_cardJual"
import _content_jual from "./_cardJual"
import _content_topup from "./_topup"
import _content_editProfile from "./_editProfile"

// REDUX
import { useDispatch, useSelector } from "react-redux"
import { setProfile, setSaldo, setProduct } from "../redux/counterSlice"
import { useNavigate } from "react-router-dom"

// AXIOS
import axios from "axios"

const Profile = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()
  // =============== variable ===============
  const { isOpen, onToggle } = useDisclosure()
  const [navname, setNavname] = useState("") // JUDUL CONTENT

  // =============== FETCH DATA ===============
  const profile = useSelector((state) => state?.api?.profile) // ngambil hasil redux
  const saldo = useSelector((state) => state?.api?.saldo) // ngambil hasil redux

  // API
  async function getProfile() {
    try {
      const { data } = await axios.get("http://localhost:4321/users")
      dispatch(setProfile(data[0]))
      dispatch(setSaldo(data[0].saldo))
    } catch (error) {
      console.error(error)
    }
  }

  async function getJual() {
    try {
      const { data } = await axios.get("http://localhost:4321/jual")
      dispatch(setProduct(data))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProfile()
    getJual()
  }, [saldo])

  // =============== CONVERT RUPIAH ===============
  const convertSaldo = `1000000`
    .split("")
    .reverse()
    .join("")
    .match(/\d{1,3}/g)
    .join(".")
    .split("")
    .reverse()
    .join("")
  // =============== DOM ===============
  const showContent = (temp) => {
    return (
      setNavname(temp.target.value),
      document.querySelector(".edit-profile").classList.add("hide"),
      document.querySelector(".topup").classList.add("hide"),
      document.querySelector(".jual").classList.add("hide"),
      document.querySelector(".wishlist").classList.add("hide"),
      document.querySelector(".riwayat-jual").classList.add("hide"),
      document.querySelector(".riwayat-beli").classList.add("hide"),
      // ====== SHOW CONTENT =========
      document.querySelector(`.${temp.target.name}`).classList.remove("hide")
    )
  }

  const logout = () => {
    return (
      Loading.standard(),
      setTimeout(
        () =>
          Report.success(
            `LOGOUT BERHASIL`,
            ``,
            "OKAY",
            () => nav("/"),
            Loading.remove()
          ),
        2500
      )
    )
  }

  return (
    <div className="container-profile">
      {/* <Navbar /> */}
      <div className="profile-div">
        <Box className="profile">
          {/* PROFILE */}
          <Center>
            <Image
              className="profile-img"
              borderRadius="full"
              boxSize="10vw"
              marginTop="5vh"
              src={ProfileImg}
            />
          </Center>

          {/* NAMA PROFILE */}
          <Center>
            <Box
              w="80%"
              mt="2vh"
              lineHeight="4vh"
              fontSize={["sm", "md", "lg", "xl"]}
              color="whiteAlpha.600"
            >
              {profile.nama}
            </Box>
          </Center>
          <Box fontSize={["sm", "md", "lg", "xl"]} color="whiteAlpha.600">
            Rp {saldo}
          </Box>
          {/* BUTTON PROFILE */}
          <div className="pd">
            <Button
              colorScheme="whiteAlpha"
              variant="link"
              onClick={onToggle}
              mt="3vh"
              fontSize="1.35vw"
            >
              <Icon as={EditIcon} mr="5px" />
              Akun saya
            </Button>

            <Collapse in={isOpen} animateOpacity>
              <Box className="nav-profile">
                <Button
                  colorScheme="whiteAlpha"
                  variant="link"
                  fontSize={"2vh"}
                  value="Profile Saya"
                  name="edit-profile"
                  onClick={(e) => showContent(e)}
                >
                  Edit Profile
                </Button>
                <Button
                  colorScheme="whiteAlpha"
                  variant="link"
                  fontSize={"2vh"}
                  value="Top up"
                  name="topup"
                  onClick={(e) => showContent(e)}
                >
                  Top Up
                </Button>
                <Button
                  colorScheme="whiteAlpha"
                  variant="link"
                  fontSize={"2vh"}
                  value="Jual"
                  name="jual"
                  ml="-5px"
                  onClick={(e) => showContent(e)}
                >
                  Jual
                </Button>
              </Box>
            </Collapse>
            <Button
              colorScheme="whiteAlpha"
              variant="link"
              value="Wishlist"
              name="wishlist"
              mt="5px"
              fontSize="1.3vw"
              onClick={(e) => showContent(e)}
            >
              <Icon as={StarIcon} mr="5px" />
              Wishlist
            </Button>
            <Button
              colorScheme="whiteAlpha"
              variant="link"
              value="Riwayat Jual"
              name="riwayat-jual"
              mt="5px"
              fontSize="1.3vw"
              onClick={(e) => showContent(e)}
            >
              <Icon as={ChatIcon} mr="5px" />
              Riwayat Jual
            </Button>
            <Button
              colorScheme="whiteAlpha"
              value="Riwayat Beli"
              name="riwayat-beli"
              variant="link"
              mt="5px"
              mb="3vh"
              fontSize="1.3vw"
              onClick={(e) => showContent(e)}
            >
              <Icon as={CheckIcon} mr="5px" />
              Riwayat Beli
            </Button>
          </div>
          {/* */}

          <Button
            colorScheme="whiteAlpha"
            variant="link"
            mt="5px"
            fontSize="1.3vw"
          ></Button>
          <Box className="logout">
            <Button
              colorScheme="whiteAlpha"
              variant="link"
              mt="5px"
              fontSize="1.3vw"
              onClick={() => logout()}
            >
              logout
            </Button>
          </Box>
        </Box>

        {/* =============== CONTENT ===============  */}

        <Box className="profile-maincontent">
          <Box
            className="judul"
            fontSize={["sm", "md", "lg", "xl"]}
            color="whiteAlpha.600"
            display={"flex"}
            alignItems={"center"}
            width={"49%"}
            mt={"10px"}
            ml={"47.3%"}
            mb={"15px"}
            justifyContent={"space-between"}
          >
            {navname}
            <Box
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              fontSize={"2vh"}
              h={"30px"}
            >
              <Text mr={"5px"}>{profile.nama}</Text>
              <Divider orientation="vertical" h={"40px"} mr={"5px"} />
              <Avatar size={["xs", "sm", "sm", "md"]} src={ProfileImg} />
            </Box>
          </Box>
          <Divider w={"95%"} m={"0 auto 20px"} />
          <Box className="edit-profile hide">
            <_content_editProfile />
          </Box>
          <Box className="topup hide">
            <_content_topup />
          </Box>
          <Box className="jual hide">
            <_content_jual />
          </Box>
          <Box className="wishlist hide">
            <_content_wishlist />
          </Box>
          <Box className="riwayat-beli hide">
            <_content_riwayatBeli />
          </Box>
          <Box className="riwayat-jual hide">{"hai"}</Box>
          {/* <Box className="jual hide">
            <Jual />
          </Box> */}
        </Box>
      </div>
    </div>
  )
}

export default Profile

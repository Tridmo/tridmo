import { ChatOutlined, CollectionsOutlined, ControlPointOutlined, HomeOutlined, HowToRegRounded, InfoOutlined, NotificationsOutlined, PersonOutlineOutlined } from "@mui/icons-material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { GroupOutlined, ViewInAr } from "@mui/icons-material";
import Image from "next/image";

export const navItemsData = [
  {
    id: 1,
    text: "Главная",
    link: "/",
  },
  {
    id: 2,
    text: "О нас",
    link: "/about-us",
  },
  {
    id: 3,
    text: "Дизайнеры",
    link: "/designers",
  },
  {
    id: 4,
    text: "Бренды",
    link: "/brands",
  },
  {
    id: 5,
    text: "Модели",
    link: "/models/?page=1",
  },
  {
    id: 6,
    text: "Интерьеры",
    link: "/interiors/?page=1",
  }
];

export const navItemsDataMobile = (isAuthenticated: boolean, notificationCountsStatus: string, notificationCounts: any, chatUnread: any, openLogin: () => void, openSignup: () => void, openNotifications: () => void) => [
  {
    id: 1,
    text: "Главная",
    link: "/",
    icon: <HomeOutlined />,
  },
  {
    id: 2,
    text: "О нас",
    link: "/about-us",
    icon: <InfoOutlined />,
  },
  {
    id: 3,
    text: "Дизайнеры",
    link: "/designers",
    icon: <GroupOutlined />,
  },
  {
    id: 4,
    text: "Бренды",
    link: "/brands",
    icon: <StorefrontIcon />,
  },
  {
    id: 5,
    text: "Модели",
    link: "/models/?page=1",
    icon: <ViewInAr />,
  },
  {
    id: 6,
    text: "Интерьеры",
    link: "/interiors/?page=1",
    icon: <CollectionsOutlined />,
  },
  ...(
    isAuthenticated ? [{
      id: -1,
      text: "Добавить работу",
      link: "/profile",
      icon: <ControlPointOutlined />,
    }, {
      id: -2,
      text: `Уведомления (${notificationCountsStatus === "succeeded" ? notificationCounts?.data?.unread_count || "0" : "0"})`,
      link: "",
      click: openNotifications,
      icon: <NotificationsOutlined />,
    }, {
      id: -3,
      text: `Чат (${String(
        Number(chatUnread?.private || 0) +
        Number(chatUnread?.rooms || 0)
      ) || "0"})`,
      link: "/chat",
      icon: <ChatOutlined />,
    }, {
      id: -4,
      text: "Мой профиль",
      link: "/profile",
      icon: <PersonOutlineOutlined />,
    }] : [{
      id: -1,
      text: "Логин",
      link: "",
      click: openLogin,
      icon: <Image
        src="/icons/login-circle.svg"
        alt="icon"
        width={24}
        height={24}
      />
    }, {
      id: -2,
      text: "Регистрация",
      link: "",
      click: openSignup,
      icon: <HowToRegRounded />
    }]
  ),
];
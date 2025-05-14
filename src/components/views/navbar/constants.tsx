import { ChatOutlined, CollectionsOutlined, ControlPointOutlined, GroupOutlined, HomeOutlined, HowToRegRounded, NotificationsOutlined, PersonOutlineOutlined, ViewInAr } from "@mui/icons-material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Image from "next/image";

export const navItemsData = [
  {
    id: 1,
    text: "Главная",
    link: "/",
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
    link: "/models",
  },
  {
    id: 6,
    text: "Интерьеры",
    link: "/interiors",
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
    link: "/models",
    icon: <ViewInAr />,
  },
  {
    id: 6,
    text: "Интерьеры",
    link: "/interiors",
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
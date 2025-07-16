import { Breadcrumbs, Text } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";

export function BreadcrumbsBase() {
  const location = useLocation();
  const { pathname } = location;
  const pathArray = pathname.split("/").filter((path) => path);
  return (
    <Breadcrumbs separator=">" classNames={{ separator: "mx-2 text-gray-500" }}>
      <Link
        to="/"
        className={`hover:text-subColor hover:underline ${
          pathname !== "/"
            ? "text-subColor hover:text-subColor hover:underline"
            : "text-gray-500"
        }`}
      >
        <Text size="sm" fw={500} className="text-blue-500 hover:text-blue-400">
          Trang chủ
        </Text>
      </Link>
      {pathArray.map((path, index) => {
        const to = `/${pathArray.slice(0, index + 1).join("/")}`;
        const isActive = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            className={` ${
              !isActive
                ? "text-subColor hover:text-subColor hover:underline"
                : "text-gray-500"
            } `}
            style={{
              pointerEvents: isActive ? "none" : "auto",
              textDecoration: "none"
            }}
          >
            <Text size="sm" fw={700} className="first-letter:uppercase">
              {path}
            </Text>
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

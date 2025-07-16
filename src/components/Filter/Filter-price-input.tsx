import { Box, Button, NumberInput, SimpleGrid } from "@mantine/core";
import { useEffect, useState, type JSX } from "react";
import { useSearchParams } from "react-router-dom";

export const FilterPriceInput = ({
  styleBtn,
  errorMessage
}: {
  styleBtn?: string;
  errorMessage?: (message: string) => JSX.Element;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [message, setMessage] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    setMinPrice(Number(searchParams.get("minPrice") || 0));
    setMaxPrice(Number(searchParams.get("maxPrice") || 0));
  }, [searchParams]);

  const onHandleFilter = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (maxPrice === 0) {
      setMessage("Giá tối đa không được bằng 0.");
      return;
    }

    if (minPrice > maxPrice) {
      setMessage("Giá tối thiểu không được lớn hơn giá tối đa.");
      return;
    }

    if (minPrice < 1000 || maxPrice < 1000) {
      setMessage("Giá phải từ 1.000 VNĐ trở lên.");
      return;
    }

    setMessage("");
    params.set("minPrice", String(minPrice));
    params.set("maxPrice", String(maxPrice));
    setSearchParams(params);
  };

  return (
    <>
      <SimpleGrid cols={2} w={"100%"} flex={1}>
        <NumberInput
          label="Giá từ"
          thousandSeparator=","
          clampBehavior="strict"
          defaultValue={maxPrice}
          value={minPrice}
          onChange={(v) => {
            const value = Number(v) || 0;
            setMinPrice(value);
          }}
          w={"100%"}
          max={2000000}
          min={0}
          error={message !== ""}
        />
        <NumberInput
          label="Đến"
          thousandSeparator=","
          clampBehavior="strict"
          value={maxPrice}
          w={"100%"}
          onChange={(v) => {
            const value = Number(v) || 0;
            setMaxPrice(value);
          }}
          defaultValue={maxPrice}
          max={2000000}
          min={0}
          error={message !== ""}
        />
      </SimpleGrid>
      <Box onClick={() => setMessage("")} className="cursor-pointer">
        {message !== "" && errorMessage && errorMessage(message)}
      </Box>
      <Button className={styleBtn} onClick={onHandleFilter}>
        Áp dụng
      </Button>
    </>
  );
};

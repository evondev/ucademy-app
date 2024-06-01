# Common

- Metadata là những thông tin của trang web, thường là để tối ưu cho việc SEO
- title: Tiêu đề của trang web
- description: Mô tả của trang web

# Next/font

- Import: import { Manrope, Roboto } from "next/font/google"
- Khai báo: const manrope = Manrope({ subsets: ["latin"] })
- weight: font weight của chữ điền vào là chuỗi weight: "400" hoặc là mảng weight: ["400","500"]
- subsets: kiểu chữ, thông thường là latin
- variable: tên biến để sử dụng trong CSS, ví dụ: variable: "--font-manrope"
- Sử dụng trong css: body{font-family: var(--font-manrope)}
- TailwindCSS: <h1 className="font-primary"></h1>

```ts
theme: {
  extend: {
    fontFamily: {
      primary: ["var(--font-manrope)"],
      secondary: ["var(--font-roboto)"],
    },
  },
},
```

- Local fonts
- import localFont from "next/font/local";

```ts
const dm_sans = localFont({
  src: "" || [
    {
      path: "",
      weight: "500",
      style: "italic",
    },
  ],
  display: "swap",
});
```

# Typescript

- `ComponentProps<"svg">`: Lấy ra các props của thẻ svg

# Kiến thức

- Nếu mà component có tính lặp đi lặp lại thì nên lưu vào 1 mảng rồi sau đó loop ra thì sẽ tối ưu hơn

# Next/Link

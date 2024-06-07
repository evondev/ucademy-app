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

- Link
- href: đường dẫn, có thể truyền vào là chuỗi hoặc object

```js
<Link
href={{
  pathname: url,
  query: { slug: "bai-1-tong-quan-ve-khoa-hoc" },
}}
></Link>
>
```

- replace: thay thế đường dẫn và không lưu lại trong lịch sử
- scroll: mặc dịnh là `true` nghĩa là khi nhấn vào link thì sẽ scroll lên trên cùng, nếu không muốn scroll thì thiết lập `scroll={false}`
- prefetch: chạy khi thẻ Link xuất hiện trên viewport mà chúng ta thấy hoặc khi chúng ta scroll
- hook `usePathname()` trả ra pathname giúp chúng ta xử lý trong những trường hợp mà chúng ta muốn ví dụ như là active link

# Error

- You're importing a component that needs `usePathname`. It only works in a Client Component but none of its parents are marked with "use client", so they're Server Components by default: Lỗi này là khi sử dụng các hook ở phía client trong khi các bạn đang sử dụng Server Components, để khắc phục thì thêm `use client` lên trên cùng của file.

# Routing

- Basic:Thư mục có file page.tsx -> sign-in: page.tsx. Sẽ tạo ra đường dẫn của webapp là /sign-in
- Lưu ý trong thư mục phải có file `page.tsx`
- Segment dynamic: [name] -> [course]: Mục đích là để lấy các params ra để xử lý một công việc gì đó ví dụ như lấy bài học từ khóa học thì mình sẽ có cấu trúc: [course]/lesson/page.tsx

```js
[course]/lesson/page.tsx
vscode-master/lesson?slug=bai-1-tong-dsfsdf
```

- Nested routes

```js
/hello/world/page.tsx
/hello/world
- hello là segment 1
- world là segment 2
```

- Group: Nó sẽ không tạo ra routing, ví dụ `(dashboard)` sẽ không tạo ra /dashboard. Nếu truy cập vào thì sẽ hiển thị not-found. Mục đích sử dụng là để gom các routing liên quan vào chung
- Ví dụ có đường dẫn là /shop, shop/a, shop/b, shop/a/b thì _Catch all segments_ sẽ chấp nhận shop/a, shop/b, shop/a/b, còn nếu vào /shop thì sẽ not-found
- Ví dụ có đường dẫn là /shop, shop/a, shop/b, shop/a/b thì _Optional Catch all segments_ sẽ chấp nhận tất cả bao gồm /shop, shop/a, shop/b, shop/a/b
- Catch-all Segments: sign-in/[...sign-in]
- Optional Catch-all Segments: sign-in/[[...sign-in]]
- Parallel Routes
- Intercepting Routes
- Lưu ý: Khi để 2 thư mục dynamic cùng cấp sẽ báo lỗi ví dụ [item] cùng cấp với [folder]

# Params

- Params: Thông thường là dynamic routes: [item]/lesson. Ví dụ /html-css/lesson?slug=color thì _html-css_ chính là `params`
- SearchParams: Thường là những query ở trên URL ví dụ lesson?slug=html-css. Thì _slug_ chính là `searchParams`

# Layout

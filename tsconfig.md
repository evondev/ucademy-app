# 1. compilerOptions

Phần này chứa các tùy chọn thiết lập cho trình biên dịch TypeScript.

- **lib:** Xác định các thư viện TypeScript cần cho dự án. Ví dụ:

  - "dom": Cho phép sử dụng các API của trình duyệt.
  - "dom.iterable": Hỗ trợ các phương thức lặp cho các đối tượng DOM.
  - "esnext": Hỗ trợ các tính năng mới nhất của ECMAScript.

- **target:** Xác định phiên bản JavaScript mà TypeScript sẽ biên dịch mã thành. Ở đây, "ES2015" là phiên bản ECMAScript 2015.

- **allowJs:** Cho phép sử dụng các file JavaScript trong dự án TypeScript. Hữu ích nếu dự án có mã JavaScript bên cạnh TypeScript.

- **skipLibCheck:** Bỏ qua kiểm tra kiểu trong các file định nghĩa thư viện (\*.d.ts). Điều này giúp tăng tốc độ biên dịch, đặc biệt khi sử dụng nhiều thư viện.

- **strict:** Bật tất cả các kiểm tra kiểu nghiêm ngặt, giúp cải thiện độ an toàn của mã.

- **noEmit:** Ngăn TypeScript xuất các file JavaScript sau khi biên dịch, thường được sử dụng trong các dự án mà quá trình build được xử lý bởi các công cụ khác (như Webpack hoặc Next.js).

- **esModuleInterop:** Hỗ trợ import và export mô-đun ES6 với mô-đun CommonJS, giúp cải thiện tính tương thích khi import các mô-đun không phải ES6.

- **module:** Chỉ định hệ thống module. "esnext" giúp TypeScript biên dịch thành mô-đun ES6, phù hợp với các hệ thống build hiện đại.

- **moduleResolution:** Cách TypeScript tìm và xử lý các mô-đun. "bundler" thường được dùng với các công cụ build hiện đại như Webpack hoặc Next.js.

- **resolveJsonModule:** Cho phép import các file JSON như các mô-đun trong TypeScript.

- **isolatedModules:** Bật chế độ "module isolated", yêu cầu mỗi file phải có ít nhất một export hoặc import. Được sử dụng để tối ưu hóa thời gian biên dịch.

- **jsx:** Xác định cách xử lý JSX trong dự án. "preserve" giữ nguyên JSX trong file kết quả để các công cụ build (như Babel) xử lý.

- **incremental:** Bật tính năng biên dịch gia tăng, giúp cải thiện tốc độ biên dịch bằng cách lưu trữ trạng thái biên dịch của các file.

- **plugins:** Liệt kê các plugin TypeScript. Plugin "next" hỗ trợ tối ưu hóa khi dùng TypeScript trong dự án Next.js.

- **paths:** Định nghĩa alias cho các đường dẫn. Ví dụ, "@/_": ["./src/_"] cho phép dùng @/ thay cho đường dẫn ./src/.

# 2. include

Danh sách các file và thư mục mà TypeScript sẽ kiểm tra và biên dịch, bao gồm:

- "global.d.ts", "next-env.d.ts": Các file định nghĩa kiểu.
- "**/\*.ts", "**/\*.tsx": Tất cả file .ts và .tsx trong dự án.
- ".next/types/\*_/_.ts": Các loại file .ts trong thư mục .next do Next.js tạo ra.
- ".eslintrc.js": Đảm bảo file cấu hình ESLint có thể được TypeScript kiểm tra.

### 3. exclude

Danh sách các thư mục và file mà TypeScript sẽ bỏ qua, ở đây chỉ có "node_modules" để tránh kiểm tra thư viện bên ngoài.

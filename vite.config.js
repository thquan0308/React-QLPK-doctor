import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dns from 'dns'

// Thiết lập thứ tự kết quả DNS
dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,  // Cấu hình cổng 3001
    open: '/login-doctor',  // Mở ứng dụng với URL /login-doctor
  },
  base: '/login-doctor/',  // Cấu hình base path cho ứng dụng là /login-doctor
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    VitePWA({
      registerType:'autoUpdate',
      manifest:{
        name:'MedicGroup',
        short_name:'MedicGroup',
        description:'App de Obra social',
        theme_color:'#fffff',
        background_color:'#fffff',
        display:'standalone',
        icons: [
          {
            src:'./icons/icons-192x192.png',
            sizes:'192x192',
            type:'image/png'
          },
          {
            src:'./icons/icons-512x512.png',
            sizes:'512x512',
            type:'image/png'
          }
        ]
      }
    })
  ],
})

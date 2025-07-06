# Etkinlik Yönetim Sistemi

## Proje Tanımı
Bu proje, kullanıcı yönetimi, rol tabanlı erişim kontrolü, etkinlik oluşturma ve listeleme, kayıt sistemi ile kullanıcılar arası mesajlaşma gibi temel işlevleri barındıran bir etkinlik yönetim web uygulamasıdır.  
Next.js (App Router) + Prisma + SQLite + Tailwind CSS kullanılarak geliştirilmiştir.

## Kullanılan Teknolojiler
- **Framework**: Next.js  
- **ORM**: Prisma  
- **Veritabanı**: SQLite  
- **Kimlik Doğrulama**: NextAuth.js (Credentials & JWT)  
- **CSS**: Tailwind CSS  
- **Diğer**: bcrypt (şifre hashleme)

## Kurulum Talimatları
1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/kullanici/etkinlik-yonetim.git
   cd etkinlik-yonetim
```
2. Bağımlılıkları yükleyin:

pnpm install

3. Ortam değişkenlerini ayarlayın:
Proje kök dizininde .env.local dosyası oluşturup aşağıdakileri ekleyin:

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<güçlü-rastgele-bir-di

4. Prisma ile veritabanını oluşturun ve client'ı üretin:

npx prisma migrate dev --name init
npx prisma generate

5. Geliştirme sunucusunu başlatın:

pnpm dev

6. Tarayıcıda http://localhost:3000]adresine gidin.

===Admin Giriş Bilgileri===
Admin rolüne sahip test hesabı:

Email: admin@gmail.com
Şifre: qwerty


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

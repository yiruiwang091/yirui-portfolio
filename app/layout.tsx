import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yirui Wang — Computational Linguistics & NLP",
  description: "Portfolio of Yirui Wang — UBC MDS-CL graduate student specializing in NLP systems, corpus tools, and data science.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="flex-1">{children}</div>

        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#060a14', padding: '20px 24px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
            {/* ICP 备案 */}
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: '0.72rem', color: '#334155', textDecoration: 'none', fontFamily: 'var(--font-geist-mono)', letterSpacing: '0.05em' }}
            >
              鲁ICP备2026016044号
            </a>

            {/* 分隔线 */}
            <span style={{ color: '#1e293b', fontSize: '0.72rem' }}>|</span>

            {/* 公安网安备案 */}
            <a
              href="https://beian.mps.gov.cn/#/query/webSearch?code=37061302000785"
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', color: '#334155', textDecoration: 'none', fontFamily: 'var(--font-geist-mono)', letterSpacing: '0.05em' }}
            >
              {/* 公安徽标 SVG */}
              <img
                src="https://beian.mps.gov.cn/web/assets/logo01.6189a29f.png"
                alt="公安备案图标"
                width={14}
                height={14}
                style={{ display: 'inline-block', verticalAlign: 'middle', opacity: 0.55 }}
              />
              鲁公网安备37061302000785号
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
import { ImageResponse } from 'next/server'

// الصورة التي تظهر عند مشاركة رابط الموقع على واتساب وفيسبوك
export const alt = 'Ai Creative - Digital Marketing Agency, Aleppo'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const runtime = 'edge'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #581c87 0%, #1e3a8a 55%, #0f766e 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 110, fontWeight: 800, letterSpacing: -2 }}>Ai Creative</div>
        <div style={{ fontSize: 44, marginTop: 24, opacity: 0.9 }}>Facebook & Instagram Ads · Content · Training</div>
        <div style={{ fontSize: 34, marginTop: 40, padding: '10px 28px', borderRadius: 999, background: 'rgba(255,255,255,0.15)' }}>
          Aleppo, Syria
        </div>
      </div>
    ),
    size
  )
}

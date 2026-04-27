import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'AlTabaq Restaurant';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#13110e',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '40px',
          border: '20px solid #c08a29',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Logo Placeholder - In production this would be the actual logo.png */}
          <div style={{
            fontSize: 100,
            fontFamily: 'serif',
            color: '#c08a29',
            marginBottom: 20,
            fontWeight: 'bold',
          }}>
            Al Tabaq
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 'normal',
              textAlign: 'center',
              maxWidth: 800,
              color: '#e8dece',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Premium Pakistani Cuisine & Desi Delicacies
          </div>
          <div style={{
            marginTop: 40,
            padding: '10px 30px',
            background: '#c08a29',
            color: 'white',
            borderRadius: 50,
            fontSize: 24,
            fontWeight: 'bold',
          }}>
            Order via WhatsApp
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

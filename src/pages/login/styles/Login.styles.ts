import { CSSProperties } from 'react';
export const LayoutStyles: CSSProperties = {
  display: 'grid',
  placeItems: 'center',
  height: '100vh',
  width: '100vw',
}

export const CardStyles: CSSProperties = {
  width: '350px',
  margin: '0 auto',
  border: '0.1px solid #999999',
  borderRadius: '10px',
  boxShadow: '0 0 10px 0 rgba(0,0,0,0.09)',
/*   textAlign: 'center',
 */
}

export const ButtonStyles: CSSProperties = {
  width: '100%',
  marginTop: 10,
  fontSize: '18px',
  height: '36px',
  fontWeight: 'bold',
}


export const MainContentStyles : CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export const FormStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
}

export const LogoStyles: CSSProperties = { fontSize: "20px" }
export const LogoContainerStyles: CSSProperties = { display: "flex", justifyContent: "center", alignItems: "center" }
export const InputStyles: CSSProperties = {marginBottom:"4px"}
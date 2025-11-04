export const loader = `
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  display: block;
  overflow-y: hidden;
  overflow-x: hidden;
}
    
#globalLoader {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  background-color: white;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  transition: opacity 300ms, background-color 300ms;
  backdrop-filter: blur(2px);
  overflow: hidden;
}

#globalLoader img {
  width: 200px;
  height: auto;
}
`

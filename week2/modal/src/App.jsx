import { useState } from 'react'
import CustomModal from './components/Modal'

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  
  //모달 열기 함수
  const showModal=()=>{
    setModalOpen(true);
  };

  return (
    <>
    <div>
    <h1>안녕하세요!</h1>
    <p>내용내용내용</p>
    <button onClick={showModal}>버튼 열기</button>
    {modalOpen && <CustomModal setModalOpen={setModalOpen} />}
    </div>

    </>
  )
}

export default App

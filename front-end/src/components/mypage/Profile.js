import React, { useState } from 'react'

const Profile = () => {
  const [profileImage, setProfileImage] = useState('path_to_default_profile_image.jpg')

  // 이미지 선택했을 때 처리 함수
  const handleImageChange = (event) => {
    const file = event.target.files[0] // 선택된 파일 가져옴
    const reader = new FileReader() // 선택된 파일 읽기

    reader.onloadend = () => {
      // 이미지 미리보기하기 위해서 데이터 URL로 변경
      setProfileImage(reader.result)
    };

    if (file) {
      reader.readAsDataURL(file)
    }
  };

  return (
    <div>
      {/* profileImage 변수에 저장된 이미지 경로 이용해서 프로필 이미지 보여줌 */}
      <img src={profileImage} alt="Profile" />

      {/* 이미지 업로드하기 위해서 input 추가 */}
      <input type="file" onChange={handleImageChange} />
    </div>
  );
};

export default Profile;

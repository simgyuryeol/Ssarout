// import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom';
// import Profile from '../components/mypage/Profile'

// const UserUpdate = () => {
//   const history = useHistory();
//   const [profileImage, setProfileImage] = useState('path_to_default_profile_image.jpg');

//   const handleImageChange = (image) => {
//     setProfileImage(image);
//   };

//   const handleSaveChanges = () => {
//     // 변경된 이미지를 MyPage로 전달
//     history.push('/mypage', { profileImage });
//   };

//   return (
//     <div>
//       <h2>회원 정보 수정</h2>
//       <Profile editable initialImage={profileImage} onImageChange={handleImageChange} />
//       <button onClick={handleSaveChanges}>Save Changes</button>
//       {/* 프로필 이미지랑 닉네임 수정란 추가하기 */}
//     </div>
//   );
// };

// export default UserUpdate


// // 프로필 이미지 컴포넌트 - MyPage, UserUpdate 에 활용

// import React, { useState, useEffect } from 'react'
// import { useLocation } from 'react-router-dom'

// const Profile = ({ editable, initialImage, onImageChange }) => {
//   const [profileImage, setProfileImage] = useState(initialImage)
//   const location = useLocation()

//   useEffect(() => {
//     // UserUpdate 페이지에서 전달한 변경된 이미지를 반영합니다.
//     if (location.state && location.state.profileImage) {
//       setProfileImage(location.state.profileImage)
//     }
//   }, [location])

//   const handleImageChange = (event) => {
//     const file = event.target.files[0]
//     const reader = new FileReader()

//     reader.onloadend = () => {
//       setProfileImage(reader.result)
//       // 변경된 이미지를 UserUpdate 페이지로 전달합니다.
//       onImageChange(reader.result)
//     }

//     if (file) {
//       reader.readAsDataURL(file)
//     }
//   }

//   return (
//     <div>
//       <img src={profileImage} alt="Profile" />
//       {editable && (
//         <input type="file" onChange={handleImageChange} />
//       )}
//     </div>
//   )
// }

// export default Profile


// import React, { useState } from 'react'
// import { Link, useLocation } from 'react-router-dom';
// import styles from './MyPage.module.css'
// import Profile from '../components/mypage/Profile'


// const MyPage = () => {
//   const location = useLocation();
//   const initialProfileImage = location.state ? location.state.profileImage : 'path_to_default_profile_image.jpg';
//   const [nickname, setNickname] = useState("Guest") // 초기값은 Guest로 설정함

//   return (
//     <div>
//       <h2>My Page</h2>
//       <Profile editable={false} initialImage={initialProfileImage} />
//       <h3>{nickname}</h3>
//       <Link to="/update" className={styles.updateButton}>회원 정보 수정</Link>
    
//       <h4>즐겨찾기</h4>
//       <h4>기록된 노래</h4>
//     </div>




//   )
// };

// export default MyPage
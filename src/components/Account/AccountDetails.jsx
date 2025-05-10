import React, { useEffect, useState } from "react";
import "./AccountDetails.css";
import defaultProfileImg from "../../assets/images/Profile.png";
import { auth, firestore, storage } from "../../services/firebaseConfig"; 
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

export default function AccountDetails() {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [profileImage, setProfileImage] = useState(storedUser?.photoURL || "/default-user.png");

  const [formData, setFormData] = useState({
    full_name: "",
    gender: "",
    dob: "",
    nationality: "",
    address_line: "",
    city: "",
    province: "",
    country: "",
    contact_number: "",
    email: "",
    profile_image: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        setFormData((prev) => ({ ...prev, email: user.email }));

        const docRef = doc(firestore, "profiles", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const profile = docSnap.data();
          setFormData((prev) => ({
            ...prev,
            ...profile,
          }));
          
          
          if (profile.profile_image) {
            setProfileImage(profile.profile_image);
          }
        }
        setLoading(false);
      } else {
        setUserId(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !userId) {
      alert("No file selected or user not logged in");
      return;
    }
  
    setUploading(true);
  
    try {
      const storageRef = ref(storage, `profile_images/${userId}`);
      const fileRef = ref(storageRef, file.name);
      
      console.log("Uploading file to:", fileRef._location.path);
      
      const snapshot = await uploadBytes(fileRef, file);
      console.log("File uploaded successfully");
      
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("Download URL obtained:", downloadURL);
      
      const profileRef = doc(firestore, "profiles", userId);
      await updateDoc(profileRef, {
        profile_image: downloadURL
      });
      console.log("Firestore document updated with new image URL");
      
      setFormData((prev) => ({
        ...prev,
        profile_image: downloadURL,
      }));
      setProfileImage(downloadURL);
      
      alert("Profile image updated successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result); 
      };
      reader.readAsDataURL(file);
      
      
      handleImageUpload(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("User not logged in");
      return;
    }
  
    try {
      const profileData = {
        full_name: formData.full_name,
        gender: formData.gender,
        dob: formData.dob,
        nationality: formData.nationality,
        address_line: formData.address_line,
        city: formData.city,
        province: formData.province,
        country: formData.country,
        contact_number: formData.contact_number,
        email: formData.email,
        profile_image: formData.profile_image 
      };
  
      console.log("Saving profile data:", profileData);
      
      const profileRef = doc(firestore, "profiles", userId);
      
      await setDoc(profileRef, profileData, { merge: true });
      
      console.log("Profile updated successfully");
      alert("Profile updated successfully!");
      
    } catch (err) {
      console.error("Error saving profile:", err);
      alert(`Error saving profile: ${err.message}`);
    }
  };

  if (loading) return <div className="loading-container">Loading...</div>;

  return (
    <div className="account-container">
      <h1>
        <span>Account</span> Center
      </h1>
      <div className="content-box">
        <div className="profile">
          <img
            src={formData.profile_image || defaultProfileImg}
            alt="User Profile"
          />
          {uploading ? (
            <div className="upload-spinner">Uploading...</div>
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
            />
          )}
        </div>

        <form className="details-grid" onSubmit={handleSubmit}>
          <section>
            <h3>Personal Details</h3>
            <p>
              <strong>Name:</strong>{" "}
              <input
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </p>

            <p>
              <strong>Gender:</strong>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </p>

            <p>
              <strong>Date of Birth:</strong>{" "}
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </p>

            <p>
              <strong>Nationality:</strong>{" "}
              <input
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
              />
            </p>
          </section>

          <section>
            <h3>Address</h3>
            <p>
              <strong>Address Line:</strong>{" "}
              <input
                name="address_line"
                value={formData.address_line}
                onChange={handleChange}
                required
              />
            </p>
            <p>
              <strong>City:</strong>{" "}
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </p>
            <p>
              <strong>Province/State:</strong>{" "}
              <input
                name="province"
                value={formData.province}
                onChange={handleChange}
                required
              />
            </p>

            <p>
              <strong>Country:</strong>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="India">India</option>
                <option value="USA">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="Canada">Canada</option>
              </select>
            </p>
          </section>

          <section>
            <h3>Contact Details</h3>
            <p>
              <strong>Phone Number:</strong>{" "}
              <input
                name="contact_number"
                value={formData.contact_number}
                readOnly
              />
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <input name="email" value={formData.email} readOnly />
            </p>
          </section>

          <button type="submit" className="edit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

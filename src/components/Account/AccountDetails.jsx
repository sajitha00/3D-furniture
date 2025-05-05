import React, { useEffect, useState } from "react";
import "./AccountDetails.css";
import defaultProfileImg from "../../assets/images/Profile.png";
import { supabase } from "../../services/supabaseClient";

export default function AccountDetails() {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

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
    const fetchProfile = async () => {
      setLoading(true);
      const { data: userData, error: authError } =
        await supabase.auth.getUser();

      if (authError || !userData?.user?.id) {
        console.error("Auth error:", authError);
        setLoading(false);
        return;
      }

      const uid = userData.user.id;
      setUserId(uid);

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", uid)
        .single();

      if (profileError) {
        console.error("Profile fetch error:", profileError);
      } else {
        setFormData({
          full_name: profile.full_name || "",
          gender: profile.gender || "",
          dob: profile.dob || "",
          nationality: profile.nationality || "",
          address_line: profile.address_line || "",
          city: profile.city || "",
          province: profile.province || "",
          country: profile.country || "",
          contact_number: profile.contact_number || "",
          email: profile.email || "",
          profile_image: profile.profile_image || "",
        });
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !userId) return;

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      alert("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: publicData, error: publicUrlError } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    const imageUrl = publicData?.publicUrl;
    console.log("✅ Uploaded image URL:", imageUrl);

    if (publicUrlError || !imageUrl) {
      alert("Failed to retrieve image URL.");
      setUploading(false);
      return;
    }

    // Save image URL to DB
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ profile_image: imageUrl })
      .eq("id", userId);

    if (updateError) {
      alert("Error saving image URL: " + updateError.message);
    } else {
      setFormData((prev) => ({ ...prev, profile_image: imageUrl }));
      alert("Profile image updated!");
    }

    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;

    const updateFields = {
      full_name: formData.full_name,
      gender: formData.gender,
      dob: formData.dob,
      nationality: formData.nationality,
      address_line: formData.address_line,
      city: formData.city,
      province: formData.province,
      country: formData.country,
    };

    const { error } = await supabase
      .from("profiles")
      .update(updateFields)
      .eq("id", userId);

    if (error) {
      alert("Error saving profile: " + error.message);
    } else {
      alert("Profile updated successfully!");
    }
  };

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
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
          />
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

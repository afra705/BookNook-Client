
"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Check, Pencil, X, Camera, UserCircle } from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-[#DADFD5] bg-white px-3.5 py-2.5 text-sm text-[#283D32] outline-none transition placeholder:text-[#A4AFA0] focus:border-[#879878] focus:ring-2 focus:ring-[#879878]/20";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

const ProfilePage = () => {
  const { data: session } = authClient.useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const userName = session?.user?.name || "BookNook Reader";
  const userEmail = session?.user?.email || "";
  const currentImage = session?.user?.image || "";

  const initials =
    userName
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "BN";


  const handleEdit = () => {
    setName(userName);
    setEmail(userEmail);
    setImage(currentImage);
    setSelectedImage("");
    setIsEditing(true);
  };


  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Image size must be less than 2 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setSelectedImage(reader.result);
      }
    };

    reader.onerror = () => {
      toast.error("Failed to read the selected image.");
    };

    reader.readAsDataURL(file);
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    setSelectedImage("");
    setName(userName);
    setEmail(userEmail);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Save name and profile image
  const handleSave = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }

    setIsSaving(true);

    try {
      const updateData: {
        name: string;
        image?: string;
      } = {
        name: name.trim(),
      };

      if (selectedImage) {
        updateData.image = selectedImage;
      }

      const { error } = await authClient.updateUser(updateData);

      if (error) {
        toast.error(error.message || "Profile update failed.");
        return;
      }

      toast.success("Profile updated successfully.");

      setIsEditing(false);
      setSelectedImage("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const previewImage = selectedImage || image;

  return (
    <main className="min-h-screen bg-[#F8F5ED] px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-xl">
        <h1 className="font-serif text-2xl font-bold text-[#283D32] sm:text-3xl">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-[#68736A]">
          Manage your BookNook account information.
        </p>

        <div className="mt-6 rounded-2xl border border-[#E7E4D9] bg-[#FFFDF8] p-5 shadow-sm sm:p-6">
          {/* Profile Information */}
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              {currentImage ? (
                <img
                  src={currentImage}
                  alt={userName}
                  className="h-16 w-16 rounded-full border-2 border-[#879878]/40 object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E6EBDD] text-lg font-bold text-[#283D32]">
                  {initials}
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-lg font-bold text-[#283D32]">
                {userName}
              </p>

              <p className="truncate text-sm text-[#68736A]">
                {userEmail}
              </p>
            </div>

            {!isEditing && (
              <button
                type="button"
                onClick={handleEdit}
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#283D32] px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3C5545] sm:px-4"
              >
                <Pencil size={15} />
                Edit
              </button>
            )}
          </div>

          {/* Edit Form */}
          {isEditing && (
            <form
              onSubmit={handleSave}
              className="mt-6 space-y-5 border-t border-[#E7E4D9] pt-5"
            >
              <h2 className="font-serif text-lg font-bold text-[#283D32]">
                Edit Profile
              </h2>

              {/* Profile Image */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#283D32]">
                  Profile Picture
                </label>

                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <div className="relative">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Profile preview"
                        className="h-24 w-24 rounded-full border-2 border-[#879878]/40 object-cover"
                      />
                    ) : (
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#E6EBDD]">
                        <UserCircle
                          size={64}
                          className="text-[#879878]"
                        />
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#FFFDF8] bg-[#283D32] text-white transition hover:bg-[#3C5545]"
                      aria-label="Choose profile image"
                    >
                      <Camera size={16} />
                    </button>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-lg border border-[#DADFD5] px-4 py-2.5 text-sm font-semibold text-[#283D32] transition hover:bg-[#E6EBDD]"
                    >
                      Choose Image
                    </button>

                    <p className="mt-2 text-xs text-[#879878]">
                      JPG, PNG or WebP. Maximum 2 MB.
                    </p>

                    {selectedImage && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedImage("");

                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                        className="mt-2 text-xs font-semibold text-[#C8795B] hover:underline"
                      >
                        Remove selected image
                      </button>
                    )}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Name */}
              <div>
                <label
                  htmlFor="profile-name"
                  className="mb-1.5 block text-sm font-semibold text-[#283D32]"
                >
                  Name
                </label>

                <input
                  id="profile-name"
                  type="text"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className={inputClass}
                  placeholder="Enter your name"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="profile-email"
                  className="mb-1.5 block text-sm font-semibold text-[#283D32]"
                >
                  Email
                </label>

                <input
                  id="profile-email"
                  type="email"
                  readOnly
                  value={email}
                  className={`${inputClass} cursor-not-allowed bg-[#F1EFE6]`}
                />

                <p className="mt-1.5 text-xs text-[#879878]">
                  Your email address cannot be changed here.
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 border-t border-[#E7E4D9] pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#DADFD5] px-4 py-2.5 text-sm font-semibold text-[#68736A] transition hover:bg-[#F1EFE6] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <X size={15} />
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#C8795B] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#B86B4F] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Check size={15} />
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;

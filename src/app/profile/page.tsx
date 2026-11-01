"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Check, Pencil, X } from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-[#DADFD5] bg-white px-3.5 py-2.5 text-sm text-[#283D32] outline-none transition placeholder:text-[#A4AFA0] focus:border-[#879878] focus:ring-2 focus:ring-[#879878]/20";

const ProfilePage = () => {
  const { data: session } = authClient.useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const userName = session?.user?.name || "BookNook Reader";
  const userEmail = session?.user?.email || "booknook.com";
  const image = session?.user?.image;
  
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
    setIsEditing(true);
  };

 const handleSave = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (!name.trim()) {
    toast.error("Name cannot be empty.");
    return;
  }

  const { error } = await authClient.updateUser({
    name: name.trim(),
  });

  if (error) {
    toast.error("Profile update failed.");
    return;
  }

  toast.success("Profile updated successfully.");
  setIsEditing(false);
};
  return (
    <main className="min-h-screen bg-[#F8F5ED] px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-xl">
        <h1 className="font-serif text-2xl font-bold text-[#283D32] sm:text-3xl">
          My Profile
        </h1>

        <div className="mt-6 rounded-2xl border border-[#E7E4D9] bg-[#FFFDF8] p-6 shadow-sm">
          {/* Profile Information */}
          <div className="flex items-center gap-4">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image}
                alt={userName}
                className="h-14 w-14 rounded-full border-2 border-[#879878]/40 object-cover"
              />
            ) : (
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#E6EBDD] text-lg font-bold text-[#283D32]">
                {initials}
              </div>
            )}

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
                className="inline-flex items-center gap-2 rounded-lg bg-[#283D32] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3C5545]"
              >
                <Pencil size={15} />
                Edit
              </button>
            )}
          </div>

          {/* Edit Form */}
          {isEditing && (
            <form onSubmit={handleSave} className="mt-6 space-y-4 border-t border-[#E7E4D9] pt-5">
              <h2 className="font-serif text-lg font-bold text-[#283D32]">
                Edit Profile
              </h2>

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
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={inputClass}
                  placeholder="Enter your email"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#DADFD5] px-4 py-2.5 text-sm font-semibold text-[#68736A] transition hover:bg-[#F1EFE6]"
                >
                  <X size={15} />
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#C8795B] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#B86B4F]"
                >
                  <Check size={15} />
                  Save Changes
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

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link, Tablet, Eye, EyeOff, RefreshCw } from "lucide-react";
import {
  EmailShareButton,
  WhatsappShareButton,
  EmailIcon,
  WhatsappIcon,
} from "react-share";

const generateToken = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return (
    chars.charAt(Math.floor(Math.random() * 26)) +
    chars.charAt(Math.floor(Math.random() * 10)) +
    chars.charAt(Math.floor(Math.random() * 26)) +
    chars.charAt(Math.floor(Math.random() * 10)) +
    chars.charAt(Math.floor(Math.random() * 26)) +
    chars.charAt(Math.floor(Math.random() * 10))
  );
};

const LinkTabletDialog = ({ kitchen_token }: { kitchen_token: string }) => {
  const [currentToken, setCurrentToken] = useState(kitchen_token);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const regenerateToken = () => {
    setCurrentToken(generateToken());
  };

  const shareUrl = `https://yourwebsite.com?token=${currentToken}`;
  const shareContent = `Here is the tablet token: ${currentToken}`;
  const shareTitle = `Tablet Token: ${currentToken}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-md bg-slate-100 p-2">
          <Button className="flex w-full items-center justify-center space-x-3 rounded-md text-lg">
            <Tablet />
            <span>Link Tablet</span>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Link Tablet</DialogTitle>
          <p className="text-sm text-gray-600">
            This dialog allows you to manage the link for the tablet. The token
            displayed below is used to link the tablet to your system. You can
            regenerate the token if needed and share it via email or WhatsApp.
          </p>
        </DialogHeader>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Input
              value={currentToken}
              type={isPasswordVisible ? "text" : "password"}
              readOnly
              className="cursor-pointer pr-10"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <Button
            variant="ghost"
            onClick={regenerateToken}
            className="flex items-center space-x-2"
          >
            <RefreshCw size={20} />
            <span>Regenerate Token</span>
          </Button>
        </div>
        <DialogFooter className="flex justify-between">
          <div className="flex space-x-2">
            <EmailShareButton
              url={shareUrl}
              subject="Tablet Token"
              body={shareContent}
            >
              <EmailIcon size={32} round />
            </EmailShareButton>
            <WhatsappShareButton url={shareUrl} title={shareTitle}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LinkTabletDialog;

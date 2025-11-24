import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Post from "@/components/post";
import User from "@/components/user";
import { AlertProvider, AlertContainer } from "@/hooks/useAlert";
import CreatePostModal from "@/components/modals/create-post-modal";
import CreateUserModal from "@/components/modals/create-user-modal";
type EntityType = "user" | "post";

const ManagementPageContent: React.FC = () => {
  const [entityType, setEntityType] = useState<EntityType>("post");
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);

  const handleClickCreate = () => {
    if (entityType === "post") {
      setIsCreatePostModalOpen(true);
    } else {
      setIsCreateUserModalOpen(true);
    }
  };

  return (
    <>
      <div className="max-w-[1200px] p-10" style={{ margin: "0 auto" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1>관리 시스템</h1>
          <p>사용자와 게시글을 관리하세요</p>
        </div>

        <Card>
          <CardHeader>
            <div className="">
              <Button
                variant={entityType === "post" ? "primary" : "secondary"}
                size="md"
                onClick={() => setEntityType("post")}
              >
                게시글
              </Button>
              <Button
                variant={entityType === "user" ? "primary" : "secondary"}
                size="md"
                onClick={() => setEntityType("user")}
              >
                사용자
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex justify-end">
              <Button onClick={handleClickCreate} variant="primary" size="md">
                새로 만들기
              </Button>
            </div>
            <AlertContainer />
            {entityType === "post" && <Post />}
            {entityType === "user" && <User />}
          </CardContent>
        </Card>
      </div>
      <CreatePostModal
        open={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
      />
      <CreateUserModal
        open={isCreateUserModalOpen}
        onClose={() => setIsCreateUserModalOpen(false)}
      />
    </>
  );
};

export const ManagementPage: React.FC = () => {
  return (
    <AlertProvider>
      <ManagementPageContent />
    </AlertProvider>
  );
};

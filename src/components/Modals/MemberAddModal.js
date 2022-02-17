import { Form, Modal, Input, Select, Spin } from "antd";
import React, { useContext, useMemo, useState } from "react";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { db } from "../../firebase/config";
import { addDocument } from "../../firebase/services";
import {
  doc,
  updateDoc,
  query,
  collection,
  where,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { debounce } from "lodash";
import Avatar from "antd/lib/avatar/avatar";

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      const unsubcribe = onSnapshot(fetchOptions(value), (snapshot) => {
        const newOptions = snapshot.docs.map((doc) => ({
          value: doc.data().uid,
          label: doc.data().displayName,
          photoURL: doc.data().photoURL,
        })).filter(doc => !props.curmembers.includes(doc.value));
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions]);

  return (
    <>
      <Select
        labelInValue
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
      >
        {options.map((opt) => (
          <Select.Option key={opt.value} value={opt.value} title={opt.label}>
            <Avatar size="small" src={opt.photoURL}>
              {opt.photoURL ? "" : opt.label?.charAt(0).toUpperCase()}
            </Avatar>
            {` ${opt.label}`}
          </Select.Option>
        ))}
      </Select>
    </>
  );
}

function fetchUserList(search) {
  return query(
    collection(db, "users"),
    where("keywords", "array-contains", search),
    orderBy("displayName"),
    limit(20)
  );
}

export default function MemberAddModal() {
  const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectedRoom } =
    useContext(AppContext);
  const [value, setValue] = useState([]);
  const {
    user: { uid },
  } = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleOk = async () => {
    const roomRef = doc(db, "rooms", selectedRoomId);
    await updateDoc(roomRef, {
      members: [...selectedRoom.members, ...value.map((v) => v.value)],
    });
    form.resetFields();
    setIsInviteMemberVisible(false);
  };

  const handleCancel = () => {
    setIsInviteMemberVisible(false);
  };

  return (
    <div>
      <Modal
        title="Invite members"
        visible={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect
            mode="multiple"
            label="Invite members"
            value={value}
            placeholder="Search for members"
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: "100%" }}
            curmembers={selectedRoom.members}
          />
        </Form>
      </Modal>
    </div>
  );
}

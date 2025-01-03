const isLoggedUserOwner = (ownerId, course) => {
  const owner = course.students?.find((item) => item.user._id === ownerId);
  if (!owner) {
    return false;
  } else {
    return owner.user._id === ownerId;
  }
};

export { isLoggedUserOwner };

import MemberDisplay from "./MemberDisplay";
import MemberGallery from "./MemberGallery";
import MembersList from "./MembersList";

function MembersPage() {
  return (
    <div className="memberspage">
      <MembersList />
      <MemberDisplay />
      <MemberGallery />
    </div>
  );
}

export default MembersPage;

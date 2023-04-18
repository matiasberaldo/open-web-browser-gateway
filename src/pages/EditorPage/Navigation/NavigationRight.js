import React from "react";
import { Nav } from "react-bootstrap";
import ForkButton from "../Buttons/ForkButton";
import PublishButton from "../Buttons/PublishButton";
import PublishDraftAsMainButton from "../Buttons/PublishDraftAsMainButton";
import SaveDraftButton from "../Buttons/SaveDraftButton";

export default ({
  jpath,
  widgetName,
  setShowModal,
  codeVisible,
  forkFile,
  near,
  path,
  metadata,
  isDraft,
}) => (
  <Nav variant="pills mb-2 mt-2 ms-auto" activeKey={jpath}>
    <Nav.Item className="">
      <SaveDraftButton widgetName={widgetName} setShowModal={setShowModal} />
      <ForkButton forkFile={forkFile} />

      {isDraft ? (
        <PublishDraftAsMainButton
          widgetName={widgetName}
          near={near}
          path={path}
          codeVisible={codeVisible}
          metadata={metadata}
        />
      ) : (
        <PublishButton
          widgetName={widgetName}
          near={near}
          path={path}
          codeVisible={codeVisible}
          metadata={metadata}
        />
      )}
    </Nav.Item>
  </Nav>
);

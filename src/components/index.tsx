import styled from 'styled-components';
import Image from 'next/image';
import { VmComponent } from '@/components/vm/VmComponent';
import { useState, useEffect } from 'react';
import OpenWeb from '@/utils/openweb';


const LogoIcon = '/assets/images/only_o_logo.png';
const MenuIcon = '/assets/images/menu_icon.png';
const LockIcon = '/assets/images/lock.png';

const Container = styled.div`
    height: 100vh;
    padding: 1rem;
`;

const Window = styled.div`
  display:flex;
  flex-direction:column;
  min-height:100vh;
  background-color:#edf8ff;
  border:1px solid rgba(0,0,0,.05);
`;

const Toolbar = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  width:100%;
  padding:13px;
  box-sizing:border-box;
`;

const LogoWrapper = styled.div`
  margin-right:30px;

  img {
    max-width:17px;
    height:auto;
  }
`;
const LocationWrapper = styled.div`
  width:100%;
  max-width:500px;
  height:auto;
  position:relative;
  align-self:flex-start;
  
  img {
    max-width:20px;
  }

  .lock {
    position:absolute;
    top:0;
    bottom:0;
    left:10px;
    margin:auto;
    max-width:15px;
  }

  * {
    opacity:.7;
  }

  &:hover {
    * {
      opacity:1;
    }
  }
`;

const ActionsWrapper = styled.div`
  display:flex;
  justify-content:flex-end;

  img {
    position:relative;
    max-width:30px;
    top:-1px;
  }
`;

const Location = styled.input`
  width:100%;
  padding:7px;
  max-width:400px;
  border-radius:10px;
  background-color:rgba(0,0,0,.02);
  border:0;
  border:1px solid rgba(0,0,0,.05);
  box-shadow: 0 0 0 0 rgba(0,0,0,.05);
  transition: all .2s;
  outline-style:none;
  font-weight:bold;
  color:rgba(0,0,0,.8);
  font-size:.8rem;
  padding-left:30px;

  &:hover {
    box-shadow: 0 0 0 3px rgba(0,0,0,.02);
    transition: all .2s;
  }
`;

const Content = styled.div`
  width:calc(100% - 20px);
  flex-grow:1;
  background-color:rgba(0,0,0,.03);
  border-radius:10px;
  margin: 0 10px 10px;
  box-sizing:border-box;
`;

const NavigationWrapper = styled.div`
  display:flex;
  width:100%;
  max-width:500px;
  height:auto;
  position:relative;
  align-self:flex-start;
  align-items:center;

  img {
    max-width:20px;
  }

  .refresh {
    margin-left:30px;
    opacity:.7;
  }
`;

const Tabs = styled.ul`
  display:flex;
  width:100%;
  padding:0;
  list-style:none;
`;

const Tab = styled.li`
  width:200px;
  border-top-left-radius:10px;
  border-top-right-radius:10px;
  border:1px solid rgba(0,0,0,.05);
  border-bottom:0;
  font-size:.8rem;
  padding:.5rem;
  font-weight:bold;
  margin:0;
`;

export default function BosMain() {
    const [url, setUrl] = useState("");
    const [code, setCode] = useState("");

    const fetch = (url: string) => {
      OpenWeb.fetch(url).then((data) => setCode(data));
    }

    useEffect(() => {
      if (!url) {
        fetch("mattb.near");
      }
    }, [])

    return (
      <Window>
          <Toolbar>
              <LogoWrapper>
              <Image src={LogoIcon} alt="" width="20" height="20" />
              </LogoWrapper>
              <NavigationWrapper>
              <LocationWrapper>
                  <img className="lock" src={LockIcon} alt="" />
                  <Location type="text" value={url} placeholder="Enter a SSC URL" onKeyUp={(e) => {
                    if (e.code === "Enter") {
                      fetch(url);
                    }
                  }} onChange={(e) => setUrl(e.target.value)} />
              </LocationWrapper>
              </NavigationWrapper>
              <ActionsWrapper>
              <img src={MenuIcon} alt="" />
              </ActionsWrapper>
          </Toolbar>
          <VmComponent
              code={code}
              props={{ hideDisclaimer: true }}
          />
      </Window>
    );
}
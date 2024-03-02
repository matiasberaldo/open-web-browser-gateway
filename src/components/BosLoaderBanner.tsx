import styled from 'styled-components';

import { useFlags } from '@/hooks/useFlags';
import { useBosLoaderStore } from '@/stores/bos-loader';

const Banner = styled.div`
  background: #fff2cd;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 2rem;
  column-gap: 8px;

  p {
    margin: 0;
    color: #664d04;
  }
`;

const Button = styled.button`
  all: unset;
  display: block;
  height: 16px;
  line-height: 16px;
  color: #664d04;
`;

export function BosLoaderBanner() {
  const redirectMapStore = useBosLoaderStore();
  const [flags, setFlags] = useFlags();

  function closeBanner() {
    if (flags?.bosLoaderUrl) {
      setFlags({ bosLoaderUrl: undefined });
    }
  }

  if (!redirectMapStore.loaderUrl) return null;

  return (
    <>
    </>
  );
}

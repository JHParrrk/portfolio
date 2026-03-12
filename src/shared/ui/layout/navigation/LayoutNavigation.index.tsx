// LayoutNavigation.index.tsx
import { Fragment } from 'react';
import { LN } from './LayoutNavigation.css';
import { useMoveToPage } from '@/shared/hooks/customs/useMoveToPage';

const NAVIGATION_MENUS = [
  { name: '기능TEST', page: '/feature-tests' },
  { name: '자유게시판', page: '/boards' },
  { name: '중고장터', page: '/market' },
  { name: '마이페이지', page: '/mypages' },
];

export default function LayoutNavigation(): JSX.Element {
  const { onClickMoveToPage } = useMoveToPage();

  return (
    <div className={LN.Wrapper}>
      {NAVIGATION_MENUS.map((el) => (
        <Fragment key={el.page}>
          <div
            className={LN.MenuItem}
            onClick={onClickMoveToPage(el.page)}
            style={{ textDecoration: 'none' }}
          >
            {el.name}
          </div>
        </Fragment>
      ))}
    </div>
  );
}

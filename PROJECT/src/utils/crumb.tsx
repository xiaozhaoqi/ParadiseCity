import NavLink from 'umi/navlink';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';

// 更多配置请移步 https://github.com/icd2k3/react-router-breadcrumbs-hoc
const routes = [
  { path: '/', breadcrumb: 'IO Board' },
  { path: '/pc', breadcrumb: 'Hi' },
  { path: '/pc/cardList', breadcrumb: '留言卡片' },
  { path: '/pc/write', breadcrumb: '编辑器' },
];

export default withBreadcrumbs(routes)(({ breadcrumbs }) => (
  <div style={{ margin: '20px 5px' }}>
    {breadcrumbs.map((breadcrumb, index) => (
      <span key={breadcrumb.key}>
        {breadcrumb}
        {index < breadcrumbs.length - 1 && <i> / </i>}
      </span>
    ))}
  </div>
));

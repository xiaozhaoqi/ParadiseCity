import NavLink from 'umi/navlink';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import { connect } from 'dva';
// 更多配置请移步 https://github.com/icd2k3/react-router-breadcrumbs-hoc
export default withBreadcrumbs([])(({ breadcrumbs }) => (
  <div>
    {breadcrumbs.map((breadcrumb, index) => (
      <span key={breadcrumb.key}>
        <NavLink to={breadcrumb.props.match.url}>
          <span style={{ fontSize: '14px', color: 'black' }}>
            {breadcrumb}
          </span>
        </NavLink>
        {index < breadcrumbs.length - 1 && <i> / </i>}
      </span>
    ))}
  </div>
));


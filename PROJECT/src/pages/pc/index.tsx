import Link from 'umi/link';
import { Button } from 'antd';
// PC entry
export default function () {
    if(/Android|webOS|iPhone|iPad|BlackBerry|SymbianOS|IEMobile/i.test(navigator.userAgent)){
        window.location.pathname = "/mobile";
    }
    return (
        <div>
            <Link to="/pc/write/createNewArticle">
              <Button type="primary">写文章</Button>
            </Link>
        </div>
    )
}
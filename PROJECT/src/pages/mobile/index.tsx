import Link from 'umi/link';
import { Button } from 'antd-mobile';
// PC entry
export default function () {
    return (
        <div>
            <Link to="/mobile/write/createNewArticle">
              <Button type="primary">写文章</Button>
            </Link>
        </div>
    )
}
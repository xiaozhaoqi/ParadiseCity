import Link from 'umi/link';
import { Button } from 'antd';
// PC entry
export default function () {
    return (
        <div>
            <Link to="/pc/write/createNewArticle">
              <Button type="primary">写文章</Button>
            </Link>
        </div>
    )
}
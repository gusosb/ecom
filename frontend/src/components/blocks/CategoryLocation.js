
const CategoryLocation = ({ Link, topCategory, subCategory, subTwoCategory }) => {
    return (
        <>
            <Link to={`/${topCategory.name.toLowerCase()}`} style={{ textDecoration: 'none', color: '#8a8a8a' }}>{topCategory.name}&nbsp;</Link>
            {subCategory && <><Link to={`/${topCategory.name.toLowerCase()}/${subCategory.name.toLowerCase()}`} style={{ textDecoration: 'none', color: '#8a8a8a' }}> / {subCategory.name}&nbsp;</Link>
                {subTwoCategory && <Link to={`/${topCategory.name.toLowerCase()}/${subCategory.name.toLowerCase()}/${subTwoCategory.name.toLowerCase()}`} style={{ textDecoration: 'none', color: '#8a8a8a' }}> / {subTwoCategory.name}</Link>}</>
            }
        </>
    )
}

export default CategoryLocation
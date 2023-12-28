
const CategoryLocation = ({ Link, topCategory, subCategory, subTwoCategory }) => {
    return (
        <>
            <Link to={`/${topCategory.name.toLowerCase()}`} style={{ textDecoration: 'none', color: '#8a8a8a' }}>{topCategory.name.charAt(0).toUpperCase() + topCategory.name.slice(1)}&nbsp;</Link>
            {subCategory && <><Link to={`/${topCategory.name.toLowerCase()}/${subCategory.name.toLowerCase()}`} style={{ textDecoration: 'none', color: '#8a8a8a' }}> / {subCategory.name.charAt(0).toUpperCase() + subCategory.name.slice(1)}&nbsp;</Link>
                {subTwoCategory && <Link to={`/${topCategory.name.toLowerCase()}/${subCategory.name.toLowerCase()}/${subTwoCategory.name.toLowerCase()}`} style={{ textDecoration: 'none', color: '#8a8a8a' }}> / {subTwoCategory.name.charAt(0).toUpperCase() + subTwoCategory.name.slice(1)}</Link>}</>
            }
        </>
    )
}

export default CategoryLocation
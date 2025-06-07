const Include = ({
  label,
  checked,
  setChecked,
  checkedArray,
  setCheckedArray,
  value,
}) => {
  return (
    <div className='flex justify-start align-center gap-6 '>
      <div
        className='check-container my-auto'
        onClick={() => {
          setChecked(!checked)
          if (!checked) {
            setCheckedArray([...checkedArray, value])
          } else {
            setCheckedArray(checkedArray.filter((v) => v !== value))
          }
        }}
      >
        <input
          className='relative block appearance-none w-[20px] h-[20px] border-2 border-grey-200 border-solid self-center  bg-transparent ../assets/images/icon-check.svg checked:bg-green-200 checked:border-0  bg-transparent cursor-pointer hover:border-green-200'
          type='checkbox'
          checked={checked}
          onChange={() => {}}
        />
        <div className={`check-icon ${checked ? '' : 'icon-hidden'}`}></div>
      </div>
      <label className='text-[18px]/[24px] text-grey-200 max-sm:text-[16px]/[20px]'>
        {label}
      </label>
    </div>
  )
}

export default Include

import { apply } from 'twind';
import { css } from 'twind/css';

export const focus = apply`focus:(transition outline-none ring([1.5px] primary-600))`;

export const editorStyle = {
  '&': apply`min-h-[40vh] focus:(outline-none) bg-white rounded overflow-x-auto`,
  h1: apply`text(xl gray-600) font-semibold my(2)`,
  h2: apply`text(lg gray-600) font-semibold my(2)`,
  h3: apply`text(base gray-600) font-semibold my(2)`,
  h4: apply`text(sm gray-600) font-semibold my(2)`,
  h5: apply`text(sm gray-600) font-semibold my(2)`,
  h6: apply`text(xs gray-600) font-semibold my(2)`,
  p: apply`text(sm gray-600) my(1.5)`,
  table: apply`mx-auto max-w-4xl w-[98%] relative border-collapse table-fixed bg-white rounded border(2 gray-200)`,
  'table .column-resize-handle': apply`bg-primary-200 absolute pointer-events-none w-1 -right-0.5 top-0 -bottom-0.5`,
  //   tbody: apply`bg-gray-100`,
  td: apply`min-w-[120px]`,
  th: apply`min-w-[120px] border(1 white)`,
  'tr th': apply`bg-primary-500 font-semibold`,
  'th p': apply`text-white`,
  'tr td': apply`bg-gray-50 font-medium text-center border(1 gray-200)`,
  '.selectedCell': apply`bg-gray-300`,
  a: apply`text(primary-500) hover:(underline) cursor-pointer`,
  li: apply`text(sm gray-600) my(2) ml(3) list-item children:(inline)`,
  '[data-type=taskList] p': apply`inline mb-2`,
  '[data-type=taskList] label': apply`mr(2)`,
  '[data-checked=true] p': apply`line-through`,
  '[data-type=taskList] label input': apply`-mb-0.5
   w-4 h-4 appearance-none border([1.5px] gray-200)
   bg-center bg-no-repeat bg-contain cursor-pointer 
   transition rounded
   ${css({
     '&:checked': {
       backgroundImage:
         "url(\"data:image/svg+xml,%3Csvg width='10' height='13' viewBox='0 0 18 13' fill='none' xmlns='http://www.w3.org/2000/svg'%0A%3E%3Cpath d='M6.99999 10.172L16.192 0.979004L17.607 2.393L6.99999 13L0.635986 6.636L2.04999 5.222L6.99999 10.172Z' fill='white' /%3E%3C/svg%3E%0A\")",
     },
   })}
    checked:(bg-green-400 border-transparent)`,
  '[data-type=taskList] li': apply``,
};

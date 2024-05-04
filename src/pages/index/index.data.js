
class MyPromise { 
  status = 'panding';
  constructor(Fun) {
    Fun();
   }
}
export {MyPromise};
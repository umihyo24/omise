export function seeded(seed){
  let s = seed>>>0;
  return function(){
    // xorshift32
    s ^= s << 13; s >>>= 0;
    s ^= s >> 17; s >>>= 0;
    s ^= s << 5;  s >>>= 0;
    return (s>>>0) / 0xFFFFFFFF;

  }
}

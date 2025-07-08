# TimerComponent

## Açıklama

TimerComponent, verilen time değerini doğru formatta ekranda gösterir. Sadece presentational bir bileşene olarak yer alır.

## Props

time (number, zorunlu): TimerComponent'ın saniye cinsinden göstereceği süre değeri.
color (string, opsiyonel): Timer metni rengini belirler. Varsayılan renk kullanılır.
style (object, opsiyonel): Timer bileşeninin genel stilini özelleştirmek için kullanılır.
...props (diğer opsiyonel): Timer bileşenine ekstra özellikler eklemek için kullanılır.

## Notlar

Timer component'i start, stop, reset bileşenlerini içeren useTimer() hook'u ile birlikte kullanılabilir.
Renk, stil ve diğer özellikler props üzerinden özelleştirilebilir.

## Timer Tipleri

Circle: Belirlenen süre bittikçe geri sayımın tekrardan başladığı versiyondur.
Countdown: Belirlenen süre boyunce belirlenenen değerden başlayıp 0'lanana kadar devam eden versiyondur.

## Kullanım

```jsx


import React from 'react'
import {Timer} from 'path-to-your-components'

const App = () => {

  const {time, start, stop, restart} = useTimer(60, 'circle') // 60 saniyelik bir timer
  useEffect(() => {
    start()
  }, [])

  return (
    <Button
      onPress={() => {
        restart()
      }}>Restart
     </Button>
    <TimerComponent time={time} color="blue" style={{ marginTop: 10 }}/>
  );
};

export default App


```

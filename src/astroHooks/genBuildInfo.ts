import pkgJson from '../../package.json'
import fs from 'fs'

export function genBuildinfo () {
  return {
    name: "genBuildinfo",
    hooks: {
      "astro:build:start": () => {
        const currentTime = new Date()
        const daysInChinese = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        const buildTime = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()} ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()} ${daysInChinese[currentTime.getDay()]}`
        pkgJson.buildTime = buildTime
        fs.writeFileSync('./package.json', JSON.stringify(pkgJson, null, 2))
      }
    }
  }
}
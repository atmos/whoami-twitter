# install all the shit you need to host this
require 'fileutils'

express_version       = ENV['EXPRESS_VERSION'] || '0.11.0'
node_oauth_version    = ENV['NODE_OAUTH_VERSION'] || 'v0.0.7'
express_auth_version  = ENV['EXPRESS_AUTH_VERSION'] || 'v0.0.3'
vendor_directory      = File.join(File.dirname(__FILE__), 'vendor')

desc "Package express to vendor/ for deployment"
task :setup do |t|
  FileUtils.mkdir_p vendor_directory
  Dir.chdir(vendor_directory) do
    if File.directory?('express')
      puts "You already have a copy of express"
    else
      system("git clone git://github.com/visionmedia/express.git")
      Dir.chdir("express") do
        system("git checkout #{express_version}")
        system("git submodule init")
        system("git submodule update")
        system("rm -rf .git")
        system("rm -rf .gitmodules")
      end
      Dir['express/*'].each do |file|
        FileUtils.rm_rf(file) unless file =~ %r!express/lib!
      end
      Dir['express/lib/support/*/*'].each do |file|
        FileUtils.rm_rf(file) unless file =~ %r!express/lib/support/\w+/lib!
      end
      Dir['express/lib/support/*/.git'].each do |file|
        FileUtils.rm_rf(file)
      end
    end

    if File.directory?('express-auth')
      puts "You already have a copy of express-auth"
    else
      # express auth for twitter auth
      system("git clone git://github.com/ciaranj/express-auth.git")
      Dir.chdir("express-auth") do
        system("git checkout #{express_auth_version}")
        system("rm -rf .git")
      end
      Dir['express-auth/*'].each do |file|
        FileUtils.rm_rf(file) unless file =~ %r!express-auth/lib!
      end
    end

    if File.directory?('oauth')
      puts "You already have a copy of oauth"
    else
      system("git clone git://github.com/ciaranj/node-oauth.git oauth")
      Dir.chdir("oauth") do
        system("git checkout #{node_oauth_version}")
        system("rm -rf .git")
      end
      Dir['oauth/*'].each do |file|
        FileUtils.rm_rf(file) unless file =~ %r!oauth/lib!
      end
    end
  end
end
task :default => :setup

#!/usr/bin/python
import sys
import glob
import os
import distutils.core
import shutil

if len(sys.argv) != 3:
    print("Exactly two inputs are required. See usage below:\n")
    print("\tpython deply_website.py <jemdoc_source_dir> <html_output_dir>\n")
    exit(1)

src_dir = sys.argv[1]
out_dir = sys.argv[2]

if not os.path.isdir(src_dir):
    print ("\n<jemdoc_source_dir> does not exists: " + src_dir)
    exit(1)

if not os.path.isdir(out_dir):
    print ("\n<html_output_dir> does not exists: " + out_dir)
    exit(1)


# delete all html/css files in out_dir
for fl in glob.glob(out_dir + "/*.html"):
    print ("Deleting " + fl)
    os.remove(fl)

for fl in glob.glob(out_dir + "/*.css"):
    print ("Deleting " + fl)
    os.remove(fl)

pw_dir = os.getcwd()
os.chdir(src_dir)
for fl in glob.glob("*.jemdoc"):
    syscmd = "python C:\\Users\\ajoshi\\PycharmProjects\\mywebsite\\jemdoc.py -c mysite.conf -o C:\\Users\\ajoshi\\PycharmProjects\\mywebsite\\" + out_dir + "\ " + fl
    print (syscmd)
    os.system(syscmd)

os.system(
    "python C:\\Users\\ajoshi\\PycharmProjects\\mywebsite\\jemdoc.py -c bibtex.conf -o C:\\Users\\ajoshi\\PycharmProjects\\mywebsite\\" + out_dir + "\ research.jemdoc")
os.chdir(pw_dir)
distutils.dir_util.copy_tree(src_dir + "/html", out_dir, verbose=1)
if os.path.isdir(src_dir + "/eqs"):
    distutils.dir_util.copy_tree(src_dir + "/eqs", out_dir + "/eqs", verbose=1)
    shutil.rmtree(src_dir + "/eqs")
